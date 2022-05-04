Rails.application.routes.draw do
  scope '(:locale)', locale: /fr|en/ do
    root to: 'pages#home'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    get 'services', to: 'pages#services', as: :services
    get 'terms', to: 'pages#terms', as: :terms
    get 'privacy', to: 'pages#privacy', as: :privacy
    get 'cgv', to: 'pages#cgv', as: :cgv

    get '/404', to: 'errors#not_found', via: :all
    get '/422', to: 'errors#unacceptable', via: :all
    get '/500', to: 'errors#server_error', via: :all
  end
end
