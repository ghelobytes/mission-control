require 'erb'
require 'date'
require 'rest-client'
require 'json'

# take a file name, return rendered HTML from .erb file
def render_erb(fname)
  file = File.read("#{fname}.erb")
  ERB.new(file).result(binding)
end

# fully formatted markdown post
def reddit_post
  if session[:events]
    "#{session[:intro]}\n\n#{session[:viewing]}\n\n### Live Updates
    \n#{format_events session[:events]}\n\n#{session[:stats]}
    \n#{session[:mission]}\n\n#{session[:landing]}\n\n#{session[:resources]}
    \n#{session[:participate]}"
  else
    "#{session[:intro]}\n\n#{session[:viewing]}\n\n#{session[:stats]}
    \n#{session[:mission]}\n\n#{session[:landing]}\n\n#{session[:resources]}
    \n#{session[:participate]}"
  end
end

# get score, number of comments, and html from reddit post id
def post_info(id)
  submission = request.env['redd.session'].from_ids ["t3_#{id}"].to_ary
  {
    'score' => submission[0].score,
    'num_comments' => submission[0].num_comments,
    'html' => submission[0].selftext_html
  }
end

# create a self post with a given title and text
# specified subreddit can be swapped out easily
def make_post(title, text = '')
  request
    .env['redd.session']
    .subreddit(ENV['SUBREDDIT'])
    .submit title, text: text, sendreplies: false
end

# creates a post if it doesn't exist
# edits post if it exists
def update_post(create_only = false)
  title = "r/SpaceX #{session[:launch]} Official Launch Discussion & " \
          'Updates Thread'

  if create_only && session[:post].nil?
    post = make_post title
    session[:post] = post.id
  elsif session[:post].nil?
    post = make_post title, reddit_post
    session[:post] = post.id
  else
    post = request.env['redd.session'].from_ids ["t3_#{session[:post]}"]
    post[0].edit reddit_post
  end
  post_info(session[:post])['html']
end

# get list of events and return a formatted table
def format_events(events)
  return if events.nil?
  str = "| Time | Update |\n| --- | --- |"
  events.each do |event|
    if event[1] == '' then next end # only display events with message
    str += "\n| #{event[0]} | #{event[1]} |"
  end
  str
end

# get all launches within 7 days
def upcoming_launches
  d = Date.today
  today = d.to_s
  one_week = (d + 7).to_s

  params = { params: { start: today, final: one_week } }
  resp = RestClient.get 'https://api.spacexdata.com/v1/launches/upcoming', params
  body = JSON.parse(resp.body)
  return body unless body.is_a? Array # error (success is array)

  launches = {}
  body.each do |obj|
    date = DateTime.parse(obj['launch_date_utc']).strftime('%s')

    payload = obj['payloads'][0]['payload_id']
    payload = payload[7..-1] if payload.start_with? 'SpaceX ' # CRS missions
    launches[payload] = date
  end
  launches
end
