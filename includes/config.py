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

def site_name():
   return get_config('name')

def site_url():
   return get_config('site_url')

def site_version():
   return get_config('version')

def nav_menu(sep=' | '):
   nav_menu = ''
   nav_items = get_config('nav_menu')

   for uri, name in nav_items.items():
      query_string = request.args.get('page', '')
      class_active = ' active' if query_string == uri else ''
      url = f"{get_config('site_url')}/{'' if get_config('pretty_uri') or uri == '' else '?page='}{uri}"

      nav_menu += f'<a href="{url}" title="{name}" class="item{class_active}">{name}</a>{sep}'

   return nav_menu.strip(sep)

def page_title():
   page = request.args.get('page', 'Home')
   return ' '.join(word.capitalize() for word in page.split('-'))

def page_content():
   page = request.args.get('page', 'home')
   path = os.path.join(os.getcwd(), get_config('content_path'), f'{page}.phtml')

   if not os.path.exists(path):
      path = os.path.join(os.getcwd(), get_config('content_path'), '404.phtml')

   with open(path, 'r') as file:
      return file.read()

def init():
   template_path = os.path.join(get_config('template_path'), 'template.html')
   with open(template_path, 'r') as file:
      return file.read()
