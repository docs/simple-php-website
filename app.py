from flask import Flask, render_template, request
import os

app = Flask(__name__, template_folder='template')

config = {
   'name': 'Simple Python Website',
   'site_url': '',
   'pretty_uri': False,
   'nav_menu': {
      '': 'Home',
      'about-us': 'About Us',
      'products': 'Products',
      'contact': 'Contact',
   },
   'template_path': 'template',
   'content_path': 'content',
   'version': 'v3.1',
}

def get_config(key=''):
   return config.get(key, None)

app.jinja_env.globals.update(get_config=get_config)

@app.route('/')
@app.route('/<page>')
def index(page='home'):
   page_content = get_page_content(page)
   page_title = get_page_title(page)
   nav_menu = get_nav_menu()
   return render_template('template.html', page_title=page_title, page_content=page_content, nav_menu=nav_menu)

def get_page_title(page):
   return ' '.join(word.capitalize() for word in page.split('-'))

def get_page_content(page):
   path = os.path.join(os.getcwd(), get_config('content_path'), f'{page}.phtml')
   if not os.path.exists(path):
      path = os.path.join(os.getcwd(), get_config('content_path'), '404.phtml')
   with open(path, 'r') as file:
      return file.read()

def get_nav_menu(sep=' | '):
   nav_menu = ''
   nav_items = get_config('nav_menu')
   for uri, name in nav_items.items():
      query_string = request.args.get('page', '')
      class_active = ' active' if query_string == uri else ''
      url = f"{get_config('site_url')}/{'' if get_config('pretty_uri') or uri == '' else '?page='}{uri}"
      nav_menu += f'<a href="{url}" title="{name}" class="item{class_active}">{name}</a>{sep}'
   return nav_menu.strip(sep)

if __name__ == '__main__':
   app.run(debug=True)
