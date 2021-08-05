(async () => {
  const tenantUri = 'https://your-tenant.us.qlikcloud.com';
  const webIntegrationId = 'ACE61yRP3WlUjNlXjJ_FuTKssVCduLwI';
  const titleElement = document.getElementById('title');

  async function request(path, returnJson = true) {
    const res = await fetch(`${tenantUri}${path}`, {
      mode: 'cors',
      credentials: 'include',
      redirect: 'follow',
      headers: {
        // web integration is sent as a header:
        'qlik-web-integration-id': webIntegrationId,
      },
    });
    if (res.status < 200 || res.status >= 400) throw res;
    return returnJson ? res.json() : res;
  }
  try {
    // call your-tenant.us.qlikcloud.com/api/v1/users/me to
    // retrieve the user metadata, as a way to detect if they
    // are signed in. An error will be thrown if the response
    // is a non-2XX HTTP status:
    const user = await request('/api/v1/users/me');
    document.getElementById('intro').innerHTML = `Hello, ${user.name}`;
  } catch (err) {
    const returnTo = encodeURIComponent(window.location.href);
    // redirect your user to the tenant log in screen, and once they're
    // signed in, return to your web app:
    window.location.href = `${tenantUri}/login?returnto=${returnTo}&qlik-web-integration-id=${webIntegrationId}`;
  }
})();
