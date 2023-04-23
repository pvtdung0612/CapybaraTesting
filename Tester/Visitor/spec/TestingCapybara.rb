require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = true
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Visitor', type: :system do
  # context '- Đăng ký' do
  #   scenario '- TestCase 1: Thông tin hợp lệ' do
  #     visit '/auth/signup'
  
  #     within("form") do
  #       fill_in 'email', with: 'user@example.com'
  #       fill_in 'password', with: 'password'
  #       fill_in 'repeat_password', with: 'password'
  #       choose 'Candidate'
  #     end
     
  #     click_button 'Sign up'
  
  #     expect(page).to have_content 'Welcome! You have signed up successfully.'
  #   end

  #   scenario '- TestCase 2: Thông tin không hợp lệ: Password not match' do
  #     visit '/auth/signup'
  
  #     within("form") do
  #       fill_in 'email', with: 'user@example.com'
  #       fill_in 'password', with: 'password'
  #       fill_in 'repeat_password', with: 'password1'
  #       choose 'Candidate'

  #     end
     
  #     click_button 'Sign up'
  
  #     # have_content: xem oage hien tai co noi dung nay khong
  #     expect(page).to have_content 'Password does not match'
  #   end

  #   scenario '- TestCase 3: Thông tin không hợp lệ: Email invalid' do
  #     visit '/auth/signup'
  
  #     within("form") do
  #       fill_in 'email', with: 'user@example.com'
  #       fill_in 'password', with: 'password'
  #       fill_in 'repeat_password', with: 'password1'
  #       choose 'Candidate'
  #     end
     
  #     click_button 'Sign up'
  
  #     # have_content: xem oage hien tai co noi dung nay khong
  #     expect(page).to have_content 'Password does not match'
  #   end
  # end

  # context '- Tìm kiếm công việc' do
  #   scenario '- TestCase 4: Không có công việc nào phù hợp' do
  #     visit '/'
      
  #     find('#ipt_search').set('test')

  #     find("form.flex.items-center.space-x-3").find("button").click
  #     expect(page).to have_content 'Không có công việc nào phù hợp!'
  #   end

  #   scenario '- TestCase 5: Tìm kiếm và có công việc phù hợp' do
  #     visit '/'
      
  #     find('#ipt_search').set('java')

  #     find("form.flex.items-center.space-x-3").find("button").click

  #     expect(page).to have_css(".items-stretch", :count => 5)
  #   end

  #   scenario '- TestCase 6: Tìm kiếm, hình thức' do
  #     visit '/'
      
  #     find('#ipt_search').set('java')
  #     choose 'Part-time'

  #     find("form.flex.items-center.space-x-3").find("button").click

  #     expect(page).to have_css(".items-stretch", :count => 5)
  #   end
  # end

  # context '- Tìm kiếm công ty' do
  #   scenario '- TestCase 7: Có công ty nào phù hợp' do
  #     visit '/findCompany'
      
  #     find('input.flex-grow').set('fpt')

  #     find("button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-78trlr-MuiButtonBase-root-MuiIconButton-root").click

  #     expect(page).to have_css("div.bg-white.rounded.p-4", :count => 1)

  #   end

  #   scenario '- TestCase 8: Tìm kiếm và Không có công ty phù hợp' do
  #     visit '/findCompany'
      
  #     find('input.flex-grow').set('ss')

  #     find("button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-78trlr-MuiButtonBase-root-MuiIconButton-root").click

  #     expect(page).to have_content 'Không có công ty nào'

  #   end
  # end


  context '- Xem công việc ' do
    scenario '- TestCase 9: Hiển thị thông tin công việc' do
      visit '/'
      
      all(".items-stretch .cursor-pointer")[0].click

      expect(page).to have_current_path('/job/1')
      expect(page).to have_button('Gửi CV')
    end

    # fail
    scenario '- TestCase 10: Hiển thị thông tin công việc và không có nút button' do
      visit '/'
      
      all(".items-stretch .cursor-pointer")[0].click

      expect(page).to have_current_path('/job/1')
      expect(page).to have_button('Gửi CVw')
    end
  end

  # context '- Xem công ty ' do
  #   scenario '- TestCase 11: Hiển thị thông tin công ty' do
  #     visit '/findCompany'
      
  #     all(".bg-white.rounded.p-4 .cursor-pointer")[0].click

  #     expect(page).to have_current_path('/company/1')
  #     expect(page).to have_button('Đánh giá công ty')

  #   end

  #   # fail
  #   scenario '- TestCase 12: Hiển thị thông tin công ty (Fail)' do
  #     visit '/findCompany'
      
  #     all(".bg-white.rounded.p-4 .cursor-pointer")[0].click

  #     expect(page).to have_current_path('/company/1')
  #     expect(page).to have_button('Đánh giá công ty')

  #   end
  # end


end

