require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://www.google.com'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Candidates', type: :system do
  context '-Thông tin tài khoản ' do 
    scenario "Test 1: accesses account info" do
      #startTime
      startTime = Time.now
      # visit signin page
      visit "http://localhost:3000/auth/signin"
  
      # Fill email và password
      fill_in "email", with: "20020390@vnu.edu.vn"
      fill_in "password", with: "12345678"
  
      # Click signin
      click_on "Sign in"
  
      # Click nút "Thông tin tài khoản" 
      click_on "Thông tin tài khoản"
  
      # Path và content mong đợi
      expect(page).to have_current_path("/company/profile")
      expect(page).to have_content("Công ty Cổ phần viễn thông FPT")

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff
    end
    scenario "Test 2: error access account info - Chưa đăng nhập" do
      #startTime
      startTime = Time.now

      # visit signin page
      visit "http://localhost:3000/company/profile"
  
      # Path và content mong đợi
      expect(page.text.strip).to be_empty

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff
    end
  end

  context '-ĐĂng bài viết ' do 
    scenario "Test 1: Đăng thành công" do
      #startTime
      startTime = Time.now

      # visit signin page
      visit "http://localhost:3000/auth/signin"
  
      # Fill email và password
      fill_in "email", with: "20020390@vnu.edu.vn"
      fill_in "password", with: "12345678"
  
      # Click signin
      click_on "Sign in"

      find('button.text-[0.9rem].flex.items-center.gap-2.py-2.px-4.rounded-md.font-poppins.uppercase').click


      # Fill thông tin công việc
      fill_in "jobTitle", with: "AAA"
      click_on "Tùy chọn"
      find("span", text: "Công nghệ thông tin").click
      fill_in "jobDescription", with: "AAA"
      fill_in "numberOfHiring", with: "5"
      fill_in "salary", with: "1000000"
      fill_in "closeDate", with: "10/10/2024"

      # Submit the job posting form
      click_on "Đăng"

      # Path mong đợi
      expect(page).to have_current_path("/company/posts")

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff
    end
  end

  context 'Quản lí bài viết ' do 
    scenario "Test 2: Xóa bài viết" do
      #startTime
      startTime = Time.now

      # visit signin page
      visit "http://localhost:3000/auth/signin"
  
      # Fill email và password
      fill_in "email", with: "20020390@vnu.edu.vn"
      fill_in "password", with: "12345678"
  
      # Click signin
      click_on "Sign in"

      click_on "Tin tuyển dụng"

      list_post = all('.flex.flex-col.w-full.p-5.gap-2.shadow-md.rounded-md.cursor-pointer')

      f_post = list_post[0]

      f_post.click

      click_on "Xóa"

      visit "http://localhost:3000/company/posts"

      
      # Content mong đợi
      expect(page).to have_no_content('Lập trình viên Java')

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff

    end

    scenario "Test 2: Sửa bài viết" do
      #startTime
      startTime = Time.now

      # visit signin page
      visit "http://localhost:3000/auth/signin"
  
      # Fill email và password
      fill_in "email", with: "20020390@vnu.edu.vn"
      fill_in "password", with: "12345678"
  
      # Click signin
      click_on "Sign in"

      click_on "Tin tuyển dụng"

      list_post = all('.flex.flex-col.w-full.p-5.gap-2.shadow-md.rounded-md.cursor-pointer')

      s_post = list_post[1]

      s_post.click

      click_on "Sửa"
      
      # Clear thông tin công việc
      fill_in 'jobTitle', with: ''


      # Fill thông tin công việc
      fill_in "jobTitle", with: "Devops"

      fill_in "jobDescription", with: "Devops"

      # Submit the job posting form
      click_on "Cập nhật"

      # Content mong đợi
      expect(page).to have_content("Devops")
      expect(page).to have_content("Cập nhập thành công.")

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff
    end
  end
  
  context 'Quản lí ứng tuyển ' do 
    scenario "Test 1: Chấp nhận đơn ứng tuyển" do
      #startTime
      startTime = Time.now

      # visit signin page
      visit "http://localhost:3000/auth/signin"
  
      # Fill email và password
      fill_in "email", with: "20020390@vnu.edu.vn"
      fill_in "password", with: "12345678"
  
      # Click signin
      click_on "Sign in"

      click_on "Quản lý CV"

      sleep 2

      list_count = all('span.ml-3')

      first_count = list_count[0].text.to_i
      second_count = list_count[1].text.to_i

      all('button[name="accepted"]').first.click

      sleep 2

      updated_list_count = all('span.ml-3')
      updated_first_count = updated_list_count[0].text.to_i
      updated_second_count = updated_list_count[1].text.to_i

      # Content mong đợi
      expect(updated_first_count).to eq(first_count - 1)
      expect(updated_second_count).to eq(second_count + 1)

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff

    end

    scenario "Test 2: Reject đơn ứng tuyển" do
      #startTime
      startTime = Time.now

      # visit signin page
      visit "http://localhost:3000/auth/signin"
  
      # Fill email và password
      fill_in "email", with: "20020390@vnu.edu.vn"
      fill_in "password", with: "12345678"
  
      # Click signin
      click_on "Sign in"

      click_on "Quản lý CV"

      sleep 2

      list_count = all('span.ml-3')

      first_count = list_count[0].text.to_i
      third_count = list_count[2].text.to_i

      all('button[name="rejected"]').first.click

      sleep 2

      updated_list_count = all('span.ml-3')
      updated_first_count = updated_list_count[0].text.to_i
      updated_third_count = updated_list_count[2].text.to_i


      # Content mong đợi
      expect(updated_first_count).to eq(first_count - 1)
      expect(updated_third_count).to eq(third_count + 1)

      #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff

    end
  end

    context 'Xem thống kê ứng tuyển ' do 
      scenario "Test 1: Xem thống kê ứng tuyển" do
        #startTime
        startTime = Time.now
        # visit signin page
        visit "http://localhost:3000/auth/signin"
    
        # Fill email và password
        fill_in "email", with: "20020390@vnu.edu.vn"
        fill_in "password", with: "12345678"
    
        # Click signin
        click_on "Sign in"
  
        # Expect content
        expect(page).to have_content("Tin tuyển dụng đang mở")
        expect(page).to have_content("CV tiếp nhận")
        expect(page).to have_content("CV phản hồi")
        expect(page).to have_content("CV ứng tuyển mới")
        expect(page).to have_content("Thống kê đơn ứng tuyển")

        #endTime
      endTime = Time.now
      diff = endTime - startTime
      puts diff
      end
    end
  
end