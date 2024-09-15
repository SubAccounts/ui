/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Добавляем настройку для игнорирования конкретного пакета
        config.resolve.fallback = {
            ...config.resolve.fallback,
            '@chainflip/sdk': false, // Замените 'package-name' на название вашего пакета
        };

        return config;
    },
}

module.exports = nextConfig
