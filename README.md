# gitlab-jira-commenter
Small app for taking version from gitlab merge request and writing comment to jira.


## Build container
```
docker build . -t gitlab-jira-commenter:1.0
```
## Start container
```
docker run -p 80:3000 gitlab-jira-commenter:1.0
```
