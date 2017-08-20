require 'rake'
require 'yaml'
require 'pathname'

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
