
from app import create_app
import os

if __name__ == '__main__':
    web = create_app()
    port = int(os.getenv('PORT', 5000))
    web.run(host="127.0.0.1", port=port)