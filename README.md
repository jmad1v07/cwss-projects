docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -it jekyll/jekyll \
  jekyll new cwss-projects

docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -it jekyll/jekyll \
  bundle add webrick

docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -p 4000:4000 \
  jekyll/jekyll \
  jekyll serve

