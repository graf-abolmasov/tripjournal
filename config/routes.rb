Rails.application.routes.draw do

  mount ActionCable.server => '/cable'

  root to: 'map#index'

  get '/notes',             to: 'notes#index',      as: :notes

  get  '/track',            to: 'api/points#create', defaults: { format: 'json' }

  resources :tracks, only: [:new, :create]
  resources :photos, only: [:new, :create]

  get  '/oauth/instagram/connect',  to: 'oauth#connect_instagram', as: :instagram
  get  '/oauth/instagram/callback', to: 'oauth#instagram',         as: :instagram_callback

  post '/webhooks/instagram', to: 'webhooks#instagram'

  namespace :api, defaults: { format: 'json' } do
    resources :points, only: [:index, :create]
    resources :tracks, only: [:index, :show]
    resources :pins, only: [:index]
  end
end
