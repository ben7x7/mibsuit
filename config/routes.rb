Rails.application.routes.draw do
  scope '(:locale)', locale: /fr|en/ do
    root to: 'pages#home'
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    get 'calculator', to: 'pages#calculator', as: :calculator
  end
end
