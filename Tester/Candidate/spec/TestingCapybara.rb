require 'rails_helper'
require 'pry'
require 'capybara/dsl'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

class Controller

end

RSpec.describe 'Candidates', type: :system do
  context '- Đăng kí' do 
    scenario "- Testcase 1: Đăng kí tài khoản thành công" do
      visit '/auth/signup'

      within("form") do
        fill_in 'email', with: 'dungn89792@gmail.com'
        fill_in 'password', with: 'dung'
        fill_in 'repeat_password', with: 'dung'
        choose('Candidate')
        choose('Candidate')
      end

      # choose('Candidate')
      click_button 'Sign up'
      expect(page).to have_content 'Đăng kí thành công'
      # binding.pry
    end
  end
  
  context '- Đăng nhập' do 
    scenario "- Testcase 2: Đăng nhập tài khoản thành công" do
      visit '/auth/signin'

      within("form") do
        fill_in 'email', with: 'phanvantiendung2002@gmail.com'
        fill_in 'password', with: '12345678'
      end

      click_button 'Sign in'
      expect(page).to have_content 'Đăng nhập thành công'
    end
  end
  
  context '- Ứng tuyển' do 
    scenario "- Testcase 1: Ứng tuyển thành công" do
      visit '/job/1'
      click_button 'Gửi CV'

      fill_in 'textarea_message', with: 'Nộp cv từ Capybara'
      attach_file "file_input", Rails.root + "spec/resources/cv.pdf"

      click_button 'Gửi'
      expect(page).to have_content 'Gửi CV thành công'
    end
  end

  context '- Báo cáo công ty' do 
    scenario "- Testcase 1: Báo cáo công ty khi đã đăng nhập" do
      # Đăng nhập
      visit '/auth/signin'

      within("form") do
        fill_in 'email', with: 'phanvantiendung2002@gmail.com'
        fill_in 'password', with: '12345678'
      end

      click_button 'Sign in'
      sleep 1

      # Báo cáo công ty
      visit '/company/1'
      click_button 'company_report'

      fill_in "textarea_description_report", with: "Báo cáo từ Capybara"

      click_button 'Gửi'

      expect(page).to have_content 'Báo cáo thành công'
    end

    scenario "- Testcase 1: Báo cáo công ty khi chưa đăng nhập" do
      visit '/company/1'
      click_button 'company_report'

      fill_in "textarea_description_report", with: "Báo cáo từ Capybara"

      click_button 'Gửi'

      expect(page).to have_content 'Báo cáo thành công'
    end
  end

  context '- Đánh giá công ty' do 
    scenario "- Testcase 1: Đánh giá công ty khi chưa đăng nhập" do
      visit '/company/1'
      click_button "company_vote"
      # click_button 'company_report'

      # fill_in "textarea_description_report", with: "Báo cáo từ Capybara"

      click_button 'Gửi'

      expect(page).to have_content 'Đánh giá không thành công'

      # binding.pry
      sleep 4
    end
    
    scenario "- Testcase 1: Đánh giá công ty khi chưa đăng nhập" do
      # Đăng nhập
      visit '/auth/signin'

      within("form") do
        fill_in 'email', with: 'phanvantiendung2002@gmail.com'
        fill_in 'password', with: '12345678'
      end

      click_button 'Sign in'

      visit '/company/1'
      click_button "company_vote"

      click_button 'Gửi'

      expect(page).to have_content 'Đánh giá thành công'
      sleep 4
    end
  end
end