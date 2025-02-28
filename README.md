# Utilities Tracker

A web application for tracking utility usage and getting basic consumption statistics.
Keep track of your gas, water, and electricity usage without the hassle of pen and paper.

## Features

-   Track multiple homes/apartments
-   Manage utility providers
-   Record monthly utility usage
-   View consumption statistics and charts
-   Multi-language support (English, Ukrainian)

## Development Setup

### Prerequisites

-   Python 3.10
-   PostgreSQL
-   Redis
-   gettext (for translations)

### Local Development

1. Clone the repository:

```bash
git clone <repository-url>
cd utilities-tracker
```

2. Create and activate virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.dev.txt
```

4. Create `.env` file:

```bash
cp .env.example .env
```

Update the environment variables in `.env` as needed.

5. Setup database:

```bash
python manage.py migrate
```

6. Compile translations:

```bash
python manage.py compilemessages --ignore .venv
```

7. Run development server:

```bash
python manage.py runserver
```

8. Create initial user (superuser):

```bash
python manage.py createsuperuser
```

The application will be available at http://localhost:8000

### Docker Development

Alternatively, you can use Docker:

```bash
docker build -t utilities-tracker .
docker run -p 8000:8000 utilities-tracker
```

### Code Quality

The project uses several tools to maintain code quality:

```bash
# Format code
black .
isort .

# Run linter
flake8

# Run tests
pytest
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
