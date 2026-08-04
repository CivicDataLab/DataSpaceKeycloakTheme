# Deploying CivicDataSpace Keycloak Theme

## Built Theme Files

After running `npm run build-keycloak-theme`, you'll find two JAR files in `dist_keycloak/`:

- `keycloak-theme-for-kc-22-to-25.jar` - For Keycloak versions 22-25
- `keycloak-theme-for-kc-all-other-versions.jar` - For other Keycloak versions

## ⚠️ IMPORTANT: Backup Before Deployment

**Always backup your Keycloak configuration before deploying the theme to avoid losing settings.**

### Method 1: Export Realm Configuration (Recommended)

1. **Via Keycloak Admin Console:**
   - Login to Keycloak Admin Console (`http://localhost:8080`)
   - Select your realm
   - Click **Realm Settings** → **Action** → **Partial export**
   - Check all options:
     - ✅ Include groups and roles
     - ✅ Include clients
     - ✅ Include identity providers
   - Click **Export**
   - Save the JSON file (e.g., `realm-backup-2024-02-17.json`)

2. **Via Command Line:**
   ```bash
   # Export all realms
   docker exec -it <container-name> /opt/keycloak/bin/kc.sh export \
     --dir /tmp/keycloak-export \
     --users realm_file
   
   # Copy exported files to your host
   docker cp <container-name>:/tmp/keycloak-export ./keycloak-backup-$(date +%Y%m%d)
   ```

### Method 2: Database Backup

If you're using PostgreSQL:

```bash
# Backup the database
docker exec -t <postgres-container> pg_dump -U keycloak keycloak > keycloak-db-backup-$(date +%Y%m%d).sql

# Or if using docker-compose
docker-compose exec -T postgres pg_dump -U keycloak keycloak > keycloak-db-backup-$(date +%Y%m%d).sql
```

### Method 3: Full Container Backup

```bash
# Create a snapshot of the Keycloak container
docker commit <container-name> keycloak-backup:$(date +%Y%m%d)

# Or backup the entire volume
docker run --rm -v keycloak_data:/data -v $(pwd):/backup alpine tar czf /backup/keycloak-volume-backup-$(date +%Y%m%d).tar.gz /data
```

### Restore Instructions (If Something Goes Wrong)

**Restore Realm Configuration:**
```bash
# Via Admin Console
# 1. Go to Realm Settings → Action → Partial import
# 2. Upload your backup JSON file
# 3. Select import options and click Import
```

**Restore Database:**
```bash
# Restore PostgreSQL backup
docker exec -i <postgres-container> psql -U keycloak keycloak < keycloak-db-backup-YYYYMMDD.sql
```

**Restore from Container Snapshot:**
```bash
# Stop current container
docker stop <container-name>

# Run the backup image
docker run -d --name keycloak-restored keycloak-backup:YYYYMMDD
```

## Deployment Options

### Option 1: Copy to Running Keycloak Container

If you have a running Keycloak container:

```bash
# Copy the theme JAR to the Keycloak providers directory
docker cp dist_keycloak/keycloak-theme-for-kc-22-to-25.jar <container-name>:/opt/keycloak/providers/

# Restart Keycloak to load the theme
docker restart <container-name>
```

### Option 2: Add to Dockerfile

Create or update your Keycloak Dockerfile:

```dockerfile
FROM quay.io/keycloak/keycloak:25.0

# Copy the custom theme
COPY dist_keycloak/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/

# Build Keycloak with the theme
RUN /opt/keycloak/bin/kc.sh build

# Set environment variables
ENV KC_DB=postgres
ENV KC_HOSTNAME=localhost

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
```

Then build and run:

```bash
docker build -t keycloak-civic .
docker run -p 8080:8080 keycloak-civic start-dev
```

### Option 3: Docker Compose

Update your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  keycloak:
    image: quay.io/keycloak/keycloak:25.0
    container_name: keycloak-civic
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
      KC_DB: postgres
      KC_DB_URL: jdbc:postgresql://postgres:5432/keycloak
      KC_DB_USERNAME: keycloak
      KC_DB_PASSWORD: password
    volumes:
      # Mount the theme JAR
      - ./dist_keycloak/keycloak-theme-for-kc-22-to-25.jar:/opt/keycloak/providers/keycloak-theme.jar
    ports:
      - "8080:8080"
    command: start-dev
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    container_name: postgres
    environment:
      POSTGRES_DB: keycloak
      POSTGRES_USER: keycloak
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Activating the Theme in Keycloak

1. **Access Keycloak Admin Console**
   - Navigate to `http://localhost:8080`
   - Login with admin credentials

2. **Select Your Realm**
   - Go to your realm (or create a new one)

3. **Configure Theme**
   - Go to **Realm Settings** → **Themes** tab
   - Set **Login theme** to `keycloakify-starter` (or your theme name)
   - Click **Save**

4. **Test the Theme**
   - Go to **Clients** → Select a client → **Login Settings**
   - Copy the **Home URL** or **Valid Redirect URIs**
   - Open in a new browser window to see your custom theme

## Theme Configuration

The theme includes:
- ✅ Custom split-screen layout (form left, logo right)
- ✅ CivicDataSpace branding and colors (#0B3865)
- ✅ Custom footer with social links
- ✅ Styled login, signup, and password reset pages
- ✅ Social provider integration styling
- ✅ Responsive design

## Troubleshooting

### Theme Not Showing
1. Ensure the JAR file is in `/opt/keycloak/providers/`
2. Restart Keycloak container
3. Check Keycloak logs: `docker logs <container-name>`
4. Verify theme is selected in Realm Settings

### Assets Not Loading
- Make sure to use the correct JAR for your Keycloak version
- Check browser console for 404 errors
- Verify the theme name matches in Realm Settings

### Need to Update Theme
1. Make changes to the theme code
2. Run `npm run build-keycloak-theme`
3. Copy the new JAR to the container
4. Restart Keycloak

## Production Deployment

For production:

1. **Use the appropriate JAR** for your Keycloak version
2. **Set proper environment variables**:
   ```bash
   KC_HOSTNAME=your-domain.com
   KC_HTTPS_CERTIFICATE_FILE=/path/to/cert.pem
   KC_HTTPS_CERTIFICATE_KEY_FILE=/path/to/key.pem
   ```
3. **Use a proper database** (PostgreSQL, MySQL, etc.)
4. **Enable HTTPS** and proper security settings
5. **Set strong admin credentials**

## Additional Resources

- [Keycloakify Documentation](https://docs.keycloakify.dev)
- [Keycloak Docker Documentation](https://www.keycloak.org/server/containers)
- [Keycloak Theme Documentation](https://www.keycloak.org/docs/latest/server_development/#_themes)
