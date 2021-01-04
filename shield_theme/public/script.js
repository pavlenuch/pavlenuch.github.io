const getPage = (name, str) => name.addEventListener('click', ()=> window.location.href = str)
let home = document.getElementById('click_home');
let blog = document.getElementById('click_blog');
let contact = document.getElementById('click_contact');
getPage(home, 'index.html')
getPage(blog, 'blog.html')
getPage(contact, 'contact.html')
