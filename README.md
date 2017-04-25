# lab3-AndrewOgren

## Collaborative Note App
I built a collaborative note taking app. A user can create and edit notes, and another user can view these changes in realtime thanks to 
Firebase. Everything worked well for me except when it came to adding dragging capability. I eventually realized the issue was that I had
been overwriting the position after pulling a note's position from firebase, so when I reloaded the page it would snap back to that position.
However, I fixed that, and everything else is working fine.

## EC
I added ZIndex sorting, so that when you click on a note, it comes to the front of all other notes. It should be brought to to the front when you drag the note as well. It works by updating the ZIndex of the last note that was clicked on, but it also keeps track of the last note that was clicked on so that it can update that note's zIndex back to the normal '1', which is what all other notes have their zIndices set to. 

## Screenshot
![](./src/snapshots/CollaborativeNotes.png)
