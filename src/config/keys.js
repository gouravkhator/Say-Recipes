import prod from './keys_prod';
import dev from './keys_dev';

let keys = null;
if (process.env.NODE_ENV === 'production') {
    keys = { ...prod };
} else {
    keys = { ...dev };
}

export default keys; //can use export default once so used variable keys