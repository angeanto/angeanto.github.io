# frozen_string_literal: true

# Stage only shared presentation sources and the AI landing page. The primary
# site never reads _ai, and this build never copies its articles or homepage.
require 'fileutils'
require 'tmpdir'

root = File.expand_path('..', __dir__)
destination = if ARGV[0]
                File.expand_path(ARGV[0])
              else
                File.join(Dir.mktmpdir('data-conscious-ai-'), 'public')
              end
abort "Destination already exists: #{destination}. Choose a new directory." if File.exist?(destination)

Dir.mktmpdir('data-conscious-ai-source-') do |staging_directory|
  # Resolve macOS /var -> /private/var before Jekyll checks template paths.
  source = File.realpath(staging_directory)
  %w[_layouts _includes _sass _data assets _config.yml].each do |entry|
    FileUtils.cp_r(File.join(root, entry), File.join(source, entry))
  end
  FileUtils.cp(File.join(__dir__, 'index.md'), File.join(source, 'index.md'))
  FileUtils.cp(File.join(__dir__, 'config.yml'), File.join(source, '_config.ai.yml'))
  File.write(File.join(source, 'CNAME'), "ai.data-conscious.com\n")

  success = system(
    { 'JEKYLL_ENV' => 'production', 'BUNDLE_GEMFILE' => File.join(root, 'Gemfile') },
    'bundle', 'exec', 'jekyll', 'build',
    '--source', source,
    '--config', "#{source}/_config.yml,#{source}/_config.ai.yml",
    '--destination', destination,
    chdir: source
  )
  abort 'AI build failed.' unless success
end

puts "AI site ready: #{destination}"
