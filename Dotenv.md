After you've cloned the repository, you need to make some adjustments.

1. Create a copy of the `.env.example` file and rename it to `.env`.

2. https://git.door43.org/repo/create create a new repository.

In `OVNER` indicate the owner of the repository, in `REPO` indicate the name of the repository.

3. To specify `TOKEN`, go to this page and create an application. https://git.door43.org/user/settings/applications. This will allow the server-side code to run on your behalf. For added security, you can create a new user and add them to your organization.

4. `FRONTEND_URL` is the domain name from which requests will be accepted. You can specify several separated by a space.

5. `CREATE_FILES`. Can the server create files in the repository, or can it be written only to existing ones. One of the values ​​is `FALSE` or `TRUE`.

6. `HIDE_TEST_PAGE`. Whether to display a page for checking server operation. In the development process, it is better to set it to `FALSE` and in production translate it to `TRUE`.
