require 'rubygems'
require 'json'

file = File.open("tinforeal.csv", "r")

# get header
keys = file.readline().chomp!.split(",")
values = []
result = []

# parse values
file.each_line do | line |
  i = 0
  jhash = {}
  line.chomp.split(",").each do |v|
    jhash[keys[i]] = v
    i += 1
  end
  result.push(jhash)
end

puts result.to_json