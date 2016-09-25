Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  root to: 'home#index'

  get '/track', to: 'api/points#create', defaults: { format: 'json' }

  get '/oauth/instagram/connect',  to: 'oauth#connect_instagram', as: :instagram
  get '/oauth/instagram/callback', to: 'oauth#instagram',         as: :instagram_callback

  post '/webhooks/instagram', to: 'webhooks#instagram'

  resources :tracks, only: [:new, :create]
  resources :photos, only: [:new, :create]

  namespace :api, defaults: { format: 'json' } do
    resources :hot_points, only: [:index]
    resources :tracks, only: [:index, :show]
    resources :pins, only: [:index]
  end
end
