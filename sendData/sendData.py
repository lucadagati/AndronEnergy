import request

api_url="http://localhost:8060"
resp=request.post(api_url+"user/login")
print(resp.json)
