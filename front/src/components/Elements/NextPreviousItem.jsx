import { IoChevronForward } from 'react-icons/io5';
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const NextPreviousItem = ({ previous, next, roles }) => {
    return (
        <section className="flex justify-between mt-8 mb-16">
            {previous && (
                <Link
                    to={`/${roles}/${previous}`}
                    className="text-purpleOiches hover:text-white"
                >
                    <button className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches flex items-end">
                        <IoChevronBack className=" border-purpleOiches hover:bg-purpleOiches text-xl" />{' '}
                        Anterior
                    </button>
                </Link>
            )}
            {next && (
                <Link
                    to={`/${roles}/${next}`}
                    className="text-purpleOiches hover:text-white "
                >
                    <button className="p-2 rounded-lg border border-purpleOiches hover:bg-purpleOiches flex items-end">
                        Siguiente{' '}
                        <IoChevronForward className=" border-purpleOiches hover:bg-purpleOiches text-xl" />
                    </button>
                </Link>
            )}
        </section>
    );
};

export default NextPreviousItem;
