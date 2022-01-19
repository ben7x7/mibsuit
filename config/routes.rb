Rails.application.routes.draw do
  scope '(:locale)', locale: /fr|en/ do
    root to: 'pages#home'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    get 'services', to: 'pages#services', as: :services
    get 'calculator', to: 'pages#calculator', as: :calculator
    get 'terms', to: 'pages#terms', as: :terms
    get 'privacy', to: 'pages#privacy', as: :privacy
    get 'cgv', to: 'pages#cgv', as: :cgv
  end
end
