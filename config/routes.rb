Rails.application.routes.draw do
  root to: 'map#index'

  get '/notes',             to: 'notes#index',      as: :notes

  get  '/track',            to: 'api/points#create'

  get  '/import',           to: 'import#show',      as: :import
  post '/import/instagram', to: 'import#instagram', as: :import_instagram
  post '/import/track',     to: 'import#track',     as: :import_track

  get  '/oauth/instagram/connect',  to: 'oauth#connect_instagram', as: :instagram
  get  '/oauth/instagram/callback', to: 'oauth#instagram',         as: :instagram_callback

  post '/webhooks/instagram', to: 'webhooks#instagram'

  namespace :api do
    resources :points, only: [:index, :create]
    resources :tracks, only: [:index]
    resources :pins, only: [:index]
  end
end
