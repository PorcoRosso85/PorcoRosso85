const frameworkFunctionalityTests = () => {
  test.skip('c.req.parseBody is working', async () => {
    const req = new Request('/economy/user/register', {
      method: 'POST',
      // formの場合は, body: new URLSearchParams({
      body: new URLSearchParams({
        name: 'test',
        email: 'test@mail.com',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const parsedBody = await req.body()
    expect(parsedBody.name).toBe('test')
    expect(parsedBody.email).toBe('test@mail.com')
  })
}
