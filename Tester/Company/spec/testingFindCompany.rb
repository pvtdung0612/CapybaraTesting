require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Company', type: :system do
  context '- Tìm công ty' do 
    scenario "- Testcase 1: Nhập tên công ty vào trường tìm kiếm " do
      visit 'http://localhost:3000/findCompany'
      fill_in 'Nhập từ khóa', with: 'FPT'
      find('#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div.flex.flex-col.items-center.gap-4.my-8.min-w-\[20rem\] > div > button > img').click
      within'#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div.flex-wrap.w-full.flex.gap-4.px-\[5rem\].pb-4.bg-\[\#f7f7f7\]'
      expect(page).to have_content'FPT'
    end

    scenario "- Testcase 2: Nhập công việc không tồn tại" do
        visit 'http://localhost:3000/findCompany'
        fill_in 'Nhập từ khóa', with: 'Misa'
        find('#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div.flex.flex-col.items-center.gap-4.my-8.min-w-\[20rem\] > div > button > img').click
         within'#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div.flex-wrap.w-full.flex.gap-4.px-\[5rem\].pb-4.bg-\[\#f7f7f7\]'
        expect(page).to have_content 'Không có công ty nào'
      end
end
end

