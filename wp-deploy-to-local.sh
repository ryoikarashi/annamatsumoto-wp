#!/usr/local/bin/zsh

# Theme
rsync -avzr --delete dist/theme/* ../../data/annamatsumoto/wp-content/themes/annamatsumoto.com

# Assets
rsync -avzr --delete dist/assets/* ../../data/annamatsumoto/assets
