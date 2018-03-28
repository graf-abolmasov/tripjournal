Rails.application.routes.draw do

  mount ActionCable.server => '/cable'


  get '/oauth/instagram/connect',  to: 'oauth#connect_instagram', as: :instagram
  get '/oauth/instagram/callback', to: 'oauth#instagram',         as: :instagram_callback

  # for OsmAnd
  get '/track', to: 'api/points#create', defaults: { format: 'json' }

  namespace :api, defaults: { format: 'json' } do
    resources :hot_points, only: [:index]
    resources :trips, only: [:index, :show]
    resources :tracks, only: [:index, :show]
    resources :int_points, only: [:index]
    resources :photo_sources, only: [:create, :index]
    resources :travelers, only: [:index]
  end

  get '/admin/(*tail)', to: 'admin_app#index'

  get '/welcome',       to: 'public_app#welcome'
  get '/(*tail)',       to: 'public_app#index'
end
