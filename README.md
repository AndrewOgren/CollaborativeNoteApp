# lab3-AndrewOgren

## Collaborative Note App
I built a collaborative note taking app. A user can create and edit notes, and another user can view these changes in realtime thanks to 
Firebase. Everything worked well for me except when it came to adding dragging capability. I eventually realized the issue was that I had
been overwriting the position after pulling a note's position from firebase, so when I reloaded the page it would snap back to that position.
However, I fixed that, and everything else is working fine.

## Screenshot
![](./src/snapshots/CollaborativeNotes.png)
