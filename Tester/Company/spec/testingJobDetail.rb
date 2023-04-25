require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

# RSpec.describe 'Job Details', type: :system do
#   it 'Hiển thị thông tin công việc' do 
#     visit 'http://localhost:3000'
#     random_job = all('#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div > div.scrollbar-hide.overflow-auto.h-full.space-y-3.w-6\/12 > div.space-y-3.flex.flex-col > *')
#     random_click = random_job.sample
#     random_click.click
#     end
    
#     it 'Hiển thị thông tin công ty' do 
#         visit 'http://localhost:3000/job/1'
#         find('#root > div > div.bg-\[\#f7f7f7\].h-screen.flex.flex-col > div.flex.w-full.flex-grow > div > div > div.scroll-hidden.overflow-auto.w-9\/12.space-y-4.bg-white.p-6.rounded-xl > div.flex.flex-row.items-center.space-x-4 > div > p.font-bold.cursor-pointer.hover\:text-slate-400').click
#         expect(page.current_url).to eq('http://localhost:3000/company/1')
# end
# end

RSpec.describe 'Nhà tuyển dụng ứng tuyển công việc', type: :system do
    before do
        visit 'http://localhost:3000/auth/signin'
        fill_in 'email', with: '20020390@vnu.edu.vn'
        fill_in 'password', with: '12345678'
        click_button 'Sign in'
    end
    it 'Thông báo lỗi khi nhà tuyển dụng ứng tuyển' do
        visit 'http://localhost:3000/job/1'
        click_button 'Gửi CV'
        expect(page).to have_css('#hs-slide-down-animation-modal > div > div', visible: true)
        click_button 'Gửi'
        expect(page).to have_content 'Thông tin không hợp lệ'
    end
end