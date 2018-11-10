# FriendFinder

Please ignore the questions being asked of the user. I "invented" them.  Random would be a good word.

The app seems to work. It will fail if there are no "friends" in the json file.  And the link to the friends list (on the home page) doesn't work, because I can't get a relative link that includes .. (e.g. ../data/friends.json) to work.  If you hover over the link, it appears in the browser (at least Chrome and Firefox) as "localhost:3000/data/friends.json," rather than "localhost:3000/../data/friends.json).  It works if you start the app from VS code, when it's using "C:///..." addresses.
