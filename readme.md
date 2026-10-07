# torgomind.com

Source for www.torgomind.com, hosted on GitHub Pages.

## Structure

```
index.html          main page (torgomind.com)
CNAME               custom domain for GitHub Pages - do not move or delete
.github/workflows/  Supabase keepalive job for the chat

about/
	links/          socials and links
	team/           "meet the team" page
	contact/        contact form
games/
	lowvileblock/   Low Vile Block page
	navicula/
		guide/      Navicula hint system
		ost/        redirect to the Navicula soundtrack download
tools/
	chat/           anonymous live chat (Supabase)
	deadvid/        dead video search
	drawdraw/       sketch pad
	goodgames/      good games list
assets/
	css/            style.css (main site stylesheet)
	js/             meatloader.js
	fonts/          shared fonts
	images/         shared images (background, title, meats, capsules, ads)
	unused/         files not used by any page, kept for reference
```

Each page lives in its own folder as `index.html`. Files used by only one page sit in that page's folder. Files used by several pages go in `assets/`.

## Publishing

From this folder:

```
git add -A
git commit -m "describe the change"
git push
```

GitHub Pages updates the live site a minute or two after the push.

To get the latest version from GitHub first (e.g. after editing on the website): `git pull`
