# CWSS Projects

Jekyll site framework to demonstrate projects run by the Centre for Water and Spatial Science at The University of Western Australia. 

## Build and develop

Develop the site using docker:

Create the project:
```
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -it jekyll/jekyll \
  jekyll new cwss-projects
```

Add webrick to gemfile:
```
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -it jekyll/jekyll \
  bundle add webrick
```

Local deploy and serve:
```
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -p 4000:4000 \
  jekyll/jekyll \
  jekyll serve
```

## GitHub Pages

Currently deployed from the `main` branch of the `cwss-projects` repository. This means the `site.baseurl` variable must be set to `/cwss-projects`.

