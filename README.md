# CapybaraTesting
Sử dụng trình kiểm thử [Capybara](#http://teamcapybara.github.io/capybara/) được lập trình bằng [ruby](#https://www.ruby-lang.org/vi/documentation/), kiểm thử web javascript.

1. [Chương trình cần kiểm thử](#projectInput)
  - [Mô tả](#descriptionProjectInput)
  - [Công nghệ sử dụng](#techProjectInput)
  - [Cài đặt](#settingProjectInput)
2. [Kiểm thử](#testing)
  - [Cài đặt](#implementTesting)
  - [Code ví dụ](#exampleCodeTesting)
  - [Mẫu Output](#formatOutputTesting)

## 1. Chương trình cần kiểm thử
<a name="descriptionProjectInput"></a>
### Mô tả
Job Finder là ứng dụng web dùng để tìm kiếm công việc cho ứng viên và tạo công việc cho công ty. Được phát triển bởi Đạo, Huyền, Dũng, Cường, Bắc.

<a name="techProjectInput"></a>
### Công nghệ sử dụng
* Front - end : [ReactJS](https://reactjs.org/)
* Back - end : [SpringBoot](https://spring.io/), [JDK11]()
* Database : [MySQL8](https://dev.mysql.com/downloads/installer/)

<a name="settingProjectInput"></a>
### Cài đặt
#### Tài khoản
- Company
```
"email": "20020390@vnu.edu.vn",
"password": "12345678",
"role": "Company"
```
- Candidates
```
"email": "nguyendanghoangdao2002@gmail.com",
"password": "12345678",
"role": "Candidate"
```


#### Backend
Cơ sở dữ liệu
1. Tạo một cơ sở dữ liệu mới (đặt tên tùy ý)
2. Tạo file `application-local.properties` trong đường dẫn `src/main/resources` với nội dung. Trong đó `server_upload_path` là đường dẫn đến thư mục để lưu file của server (Tạo một thư mục trống ở đâu đó và ghi đường dẫn vào)
```
spring.datasource.url=jdbc:mysql://localhost:3306/<database_name>
spring.datasource.username=<mysql_username>
spring.datasource.password=<mysql_password>
upload.path=<server_upload_path>
```
Ví dụ
````
spring.datasource.url=jdbc:mysql://localhost:3306/jobfinder
spring.datasource.username=root
spring.datasource.password=12345
````

Vào Server
```
cd 'c:\CapybaraTesting\ProjectInput\Testing\Server'
```
Mở Chương trình bằng IDE cho java và run file Server\src\main\java\com.uet.jobfinder\App.java

#### Frontend
Chương trình được chạy trên port 3000
Vào Client
```
cd 'c:\CapybaraTesting\ProjectInput\Testing\Client'
```
Cài đặt môi trường
```
npm install
```
Chạy chương trình
```
npm start
```

<a name="testing"></a>
## 2. Kiểm thử
Kiểm thử usecase của 4 actor chính gồm Admin, Vistor, Candidate, Company

<a name="implementTesting"></a>
### Cài đặt
Cài đặt môi trường [ruby](#https://www.ruby-lang.org/vi/downloads/)

Cài đặt rspec
```
gem install rspec
```
Cài đặt rails
```
gem install rails
```
Tạo chương trình ruby bằng rails
```
rails new [name_project]
cd [name_project]
rails db:create
```
Thêm môi trường vào GemFile
```
group :development, :test do
  # The RSpec testing framework
  gem 'rspec-rails'

  # Capybara, the library that allows us to interact with the browser using Ruby
  gem 'capybara'

  # The following gems aids with the nuts and bolts
  # of interacting with the browser.
  gem 'webdrivers'
end
```
Cài đặt môi trường
```
bundle install
```
Cài đặt rspec cho chương trình
```
rails g rspec:install
```
<a name="exampleCodeTesting"></a>
### Code ví dụ
```
require 'rails_helper'

# Thiết lập không chạy server
Capybara.run_server = false
# Thiết lập trang web mà capybara host vào
Capybara.app_host = 'http://localhost:3000//update//1'
# Thiết lập driver sử dụng cho Capybara
Capybara.default_driver = :selenium_chrome_headless

RSpec.describe 'Candidates', type: :system do
  context '- Đăng nhập' do 
    scenario "- Testcase 1: Sửa tài khoản thành công" do
      user = User.create(first_name: 'Dung', last_name: 'Phan', email: 'phandung@google.com')
      visit edit_user_path(user)
      puts user
      within("form") do
        fill_in 'First name', with: 'Dung'
        fill_in 'Email', with: 'phandung@google.com'
      end
      click_button 'Update User'
      expect(page).to have_content 'User was successfully updated.'
      expect(page).to have_content 'phandung@google.com'
    end
end
```

Chạy file test
```
rspec spec/[fileName]
```
<a name="formatOutputTesting"></a>
### Mẫu Output
```
Candidates - Đăng nhập - Testcase 1: Sửa tài khoản thành công
```
