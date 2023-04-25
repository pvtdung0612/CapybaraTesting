require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Company', type: :system do
  context '- Tìm việc' do 
    scenario "- Testcase 1: Nhập công việc vào trường tìm kiếm " do
      visit 'http://localhost:3000'
      fill_in 'ipt_search', with: 'Android'
      click_button 'Tìm kiếm' 
      within'#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div > div.scrollbar-hide.overflow-auto.h-full.space-y-3.w-6\/12 > div.space-y-3.flex.flex-col'
      expect(page).to have_content'Android'
    end

    scenario "- Testcase 2: Nhập công việc không tồn tại" do
        visit 'http://localhost:3000'
        fill_in 'ipt_search', with: 'C++'
        click_button 'Tìm kiếm' 
        within '#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div > div.scrollbar-hide.overflow-auto.h-full.space-y-3.w-6\/12 > div.space-y-3.flex.flex-col'
        expect(page).to have_content 'Không có công việc nào phù hợp!'
      end
end
end