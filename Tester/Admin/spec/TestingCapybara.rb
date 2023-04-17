require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://www.google.com'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Candidates', type: :system do
  context '- Đăng nhập' do 
    scenario "- Testcase 1: Sửa tài khoản thành công" do
      user = User.create(first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com')
      visit edit_user_path(user)
      puts user
      within("form") do
        fill_in 'First name', with: 'Jane'
        fill_in 'Email', with: 'jane.doe@example.com'
      end
      click_button 'Update User'
      expect(page).to have_content 'User was successfully updated.'
      expect(page).to have_content 'jane.doe@example.com'
    end

    scenario "- Testcase 2: Sửa tài khoản thất bại do tên người dùng trống" do
      user = User.create(first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com')
      visit edit_user_path(user)
      within("form") do
        fill_in 'First name', with: ''
      end
      click_button 'Update User'
      expect(page).to have_content 'First name can\'t be blank'
    end
  end


  context '- Xóa tài khoản' do 
    scenario "- TestCase 3: Xóa tài khoản thành công" do
      user = User.create(first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com')
      visit users_path
      # expect { click_link 'Destroy' }.to change(User, :count).by(-1)
      accept_confirm do
        click_link 'Destroy'
      end
      expect(page).to have_content 'User was successfully destroyed.'
    end
  end
end