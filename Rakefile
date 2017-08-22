require 'rake'
require 'yaml'
require 'pathname'

# Load the configuration file
CONFIG = YAML.load_file("_config.yml")

# Get and parse the date
DATE = Time.now.strftime("%Y-%m-%d")
TIME = Time.now.strftime("%H:%M:%S")

# https://github.com/jekyll/jekyll/issues/4010
# Jekyll needs a TMZ offset or doesn't copy posts into _site/
POST_TIME = DATE + ' ' + TIME + " +0200"

ICONS = {
    transparent: %w(favicon-196x196
                    favicon-160x160
                    favicon-96x96
                    favicon-32x32
                    favicon-16x16),
    white: %w(apple-touch-icon-57x57
              apple-touch-icon-76x76
              apple-touch-icon-120x120
              apple-touch-icon-152x152
              apple-touch-icon-167x167
              apple-touch-icon-180x180
              mstile-144x144)
}.freeze

def execute(command)
    system command.to_s
end

task default: :serve

desc 'Build the website'
task :build do
    execute('rm -rf _site')
    execute('JEKYLL_ENV=production bundle exec jekyll build')
end

desc 'Start a development server'
task :serve do
    execute('JEKYLL_ENV=development bundle exec jekyll serve')
end

desc 'Create vendor icons'
task :icons, :source do |_t, args|
    fpath = Pathname.new(Dir.pwd).join(args[:source])

    unless File.exist?(fpath)
        puts "\"#{args[:source]}\" does not exist, exiting."
        exit
    end

    cmds = []
    dirname = File.dirname(fpath)

    ICONS[:white].map do |icon|
        size = icon.partition('x').last
        cmds << "convert -resize x#{size.to_i * 0.7} \
                         -extent #{size}x#{size} \
                         -gravity center \
                         -background white \
                         -alpha remove #{fpath} #{dirname}/#{icon}.png"
    end

    ICONS[:transparent].map do |icon|
        size = icon.partition('x').last
        cmds << "convert -resize x#{size} #{fpath} #{dirname}/#{icon}.png"
    end

    execute(cmds.join(' && '))
end



def transform_to_file_name(title, extension)
    characters = /("|'|!|\?|:|\s\z)/
    whitespace = /\s/
    "#{title.gsub(characters, '').gsub(whitespace, '-').downcase}.#{extension}"
end

def read_file(template)
    File.read(template)
end

# Save the file with the title in the YAML front matter
def write_file(content, title, directory, file_name)
    content.sub!("title:", "title: \"#{title}\"")
    content.sub!("date:", "date: #{POST_TIME}")
    content.sub!("permalink:", "permalink: \"/#{transform_to_slug(title)}/\"")

    File.write("#{directory}/#{file_name}", content)

    puts "#{file_name} was created in '#{directory}'."
end

# Create the file with the slug and open the default editor
def create_file(directory, file_name, content, title)
    FileUtils.mkdir(directory) unless File.exist?(directory)
    raise "The file already exists.\n\n" if File.exist?("#{directory}/#{file_name}")

    write_file(content, title, directory, file_name)
end

def transform_to_slug(title)
    characters = /("|'|!|\?|:|\s\z)/
    whitespace = /\s/
    title.gsub(characters, "").gsub(whitespace, "-").downcase
end

desc "Create a new page or post"
task :create, :type, :title do |_t, args|

    puts args

    type = args[:type].downcase.strip
    title = args[:title]

    template = CONFIG[type]["template"]
    extension = CONFIG[type]["extension"]
    directory = CONFIG[type]["dir"]

    file_name = transform_to_file_name(title, extension)
    file_name.prepend("#{DATE}-") if type == 'post'
    content = read_file(template)

    create_file(directory, file_name, content, title)
end
