require 'rubygems'
require 'nokogiri'
require 'open-uri'

#### Run this script first and grab twitter links ####

twitter_links_list ='google_links.txt'
twitter_links_array = []

File.readlines(twitter_links_list).each do |line|
  twitter_links_array << line
end

twitter_links_array.map! do |link|
  #slices off "http://www.google.com/search?q="
  #then removes all special characters and numbers
  link.slice!(31..-9).gsub(/[^a-zA-Z\-]/,"")
end

#next we need to add the twitter url to the beginning
# https://twitter.com/

twitter_links_array.map! do |link|
  link.prepend("https://twitter.com/")
end

twitter_links_array.each do |link|
  puts link
end

#### Run this script second to grab handles and imgs ####
#### Comment out everything above before running script ####
#### Don't comment out require statements ####

# Next save twitter_links_array contents into 'handles.txt'
handles ='handles.txt'

twitter_urls_list = []
# save contents of text file into an array
File.readlines(handles).each do |line|
  twitter_urls_list << line
end


stripped_handles = []
twitter_images = []

twitter_urls_list.each do |link|
  page = Nokogiri::HTML(open(link))
    handle = page.css('#doc div#page-outer #page-container div div div div div div div div.ProfileHeaderCard h2 a span.u-linkComplex-target').text();
    image = page.css('#doc div#page-outer #page-container div div div div div div.ProfileAvatar a img');
    stripped_handles << handle
    twitter_images << image
end

stripped_images = []

twitter_images.each do |img|
  stripped_images << img[0].attr("src")
end

stripped_handles.each do |handle|
  p handle
end

stripped_images.each do |img|
  p img
end

