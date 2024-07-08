
import listGenreService from '../../services/musicos/listGenreService.js';

const listGenreController = async(req,res,next)=>{
try {
    const genres = await listGenreService();
    res.send({
        status: 'ok',
        data: {
        genres
        }})
} catch (error) {
    next(error)
}
};

export default listGenreController;