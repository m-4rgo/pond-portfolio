✅set up automatic gallery add  
✅create artwork pages  
✅get page links working  
✅set up pagination pages properly  
use up/down arrows to navigate menu  
use left/right arrows to navigate art close-ups.
create password protected secret upload page for uploading new artworks to the site. (a form that appends to the .json file.)  
create secret upload page for adding updates to the home screen.  
✅save scroll position in gallery when entering/exiting image viewer,  
✅reset scroll position when switching between galleries.  
"subscribe" page where you can subscribe to get SMS or email notifications when i post a new piece of work. port the page to a progressive web app so people can subscribe for push notifications too?  
requests system where people can request an artwork.

compile all artworks into a chronological feed.
format the music artworks


Thinking about the datatbase
i will have artworks:
each artwork will have an image path (or music file path) (or if its a literature/poem/blog post then it will have a text content), a titile, a date, a description, a medium perhaps,which gallery they belong to, and a mature content filter notice (for nudity, this will be used to blur out images for the cs-censored site)  
i will need to convert the .json files into database entries.

i will also have requests:
requests will have a name (if empty then anonymous) and a message content and also a "private? Y/N" boolean to determine whether the poster wants it to remain a private request.
requests will have a space to put an image path for when i complete it and a "completed?" boolean so when its set to complete it displays in the completed section with the image.

and i can repurpose the gallery to display the requests if the title = the username and the description = the request message

i will also need to have messages from the visitor book and they can be
just username and message content, and if username left blank then anonymous.

i need to format a musicgallery for the music page.


also i might change the site pages to just have one "gallery" tab and then within it be able to switch between my genres: paintings/oekaki/pixel etc.

and also i might need a downloads section where people can buy my bases and my minecraft horse texture pack and things. probably free downloads with  donate/tip banner.




need to make an admin panel (secretpotion.html) with a password where i can manage uploading new artworks, editing artworks, and manage my visitor book comments and requests (e.g deleting comments or updating request status)