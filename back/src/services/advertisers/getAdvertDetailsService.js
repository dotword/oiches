import getPool from '../../database/getPool.js';

const getAdvertDetailsService = async (idAdvert) => {
    const pool = await getPool();

    // Consulta para obtener los datos del anuncio
    const [advert] = await pool.query(
        `
            SELECT *,
                ad_categories.name AS categoria,
                ad_packages.package AS package,
                provincias.provincia AS provincia
            FROM ad_classifieds
            LEFT JOIN
                ad_categories ON ad_categories.id = ad_classifieds.category_id
            LEFT JOIN
                ad_packages ON ad_packages.id = ad_classifieds.package_id    
            LEFT JOIN 
                provincias ON provincias.id = ad_classifieds.provincia_id    
            WHERE ad_classifieds.id = ?
        `,
        [idAdvert]
    );

    if (advert.length === 0) {
        return null;
    }

    return advert;
};

export default getAdvertDetailsService;
