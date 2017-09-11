#!/usr/bin/env ruby

# show stdout in logs
$stdout.sync = true

require 'sinatra'
require 'redd/middleware'
require './functions'

set :bind, '0.0.0.0' if ARGV[0] == 'production'

use Rack::Session::Pool, # identifier that points to session data
  expire_after: 60 * 60 * 24 * 7 # one week

use Redd::Middleware,
  user_agent:   'SpaceX Mission Control (via u/theZcuber)',
  client_id:    ENV['CLIENT_ID'],
  secret:       ENV['SECRET'],
  redirect_uri: ENV['REDIRECT_URI'], # this lets us have production and tetsing
  scope:        %w[identity submit edit read],
  via:          '/auth'

# OAuth and main page
get '/' do
  if session[:support]
    if request.env['redd.session']
      # need to render before setting noshow
      page = render_erb 'pages/mission_control'
      session[:noshow] = true # hide info dialog on future pageloads
      page
    else
      render_erb 'pages/authenticate'
    end
  else
    render_erb 'pages/support_check'
  end
end

# browser support is ok (or override)
get '/supported' do
  session[:support] = true
  redirect to '/'
end

get '/auth/callback' do
  if request.env['redd.error']
    "Error: #{request.env['redd.error'].message} (<a href='/'>Back</a>)"
  elsif !session[:launch] || !session[:video]
    redirect to 'init'
  else
    redirect to '/'
  end
end

get '/logout' do
  request.env['redd.session'] = nil
  session.clear
  redirect to '/'
end

# for updating section

get '/status' do
  render_erb 'sections/status'
end

get '/post' do
  render_erb 'sections/live_post'
end

# initializing variables
get '/init' do
  render_erb 'pages/init'
end

post '/init' do
  # not doing server-side validation on this
  # if someone wants to bypass the validation, it only screws things up for them

  # if it's a launch from the API, it'll have launch time included as well
  if params[:launch].include? '|'
    nametime = params[:launch].split '|'
    session[:launch] = nametime[0]
    session[:time] = nametime[1].to_i * 1000 # JS wants milliseconds
  else
    session[:launch] = params[:launch]
  end

  # get video id from url
  # blank input doesn't set anything ─ nil or '' displays nothing
  if params[:video] != ''
    session[:video] = params[:video].match(%r{^(?:https?:\/\/)?(?:www\.)?
    youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{11,})}x)[1]
  end
  redirect to '/'
end

# receive updates
post '/update' do
  params = JSON.parse(request.body.read, symbolize_names: true)
  puts params

  session[params[:id].to_sym] = params[:value]
  update_post unless %w[time launch video].include? params[:id]
end

# called only when post doesn't exist
# creates blank reddit post
get '/update/create' do
  update_post true
end
