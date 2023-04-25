require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Company', type: :system do
  context '- Đăng nhập' do 
    scenario "- Testcase 1: Đăng nhập thành công" do
      visit 'http://localhost:3000/auth/signin'
      fill_in 'email', with: '20020390@vnu.edu.vn'
      fill_in 'password', with: '12345678'
      click_button 'Sign in' 
    end

    scenario "- Testcase 2: Đăng nhập không thành công do sai tài khoản hoặc mật khẩu" do
        visit 'http://localhost:3000/auth/signin'
        fill_in 'email', with: '20020390@vnu.edu.vn'
        fill_in 'password', with: '1234567'
        click_button 'Sign in' 
        expect(page).to have_content 'Invalid email or password'
      end
end
end