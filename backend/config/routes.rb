Rails.application.routes.draw do
  devise_for :users,
              controllers:{
                registrations: 'users/registrations',
                sessions:'users/sessions'
              }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  mount ActionCable.server => '/cable'

  resources :internships do
    resources :entries, only: [:create, :index, :destroy,:show]
    resource :like, only: [:create, :destroy]
  end

  get '/likes', to: 'likes#index'

  resources :chat_rooms, only: [:index, :show, :create] do
    resources :messages, only: [:index, :create]
  end

  resources :genres, only: [:index]
end
