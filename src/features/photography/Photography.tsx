
import styles from './Photography.module.css';
import React from 'react';
import photos, { Photo } from '../photography/photos';


/**
 * Photography section with gallery.
 *
 * @component
 * @returns {JSX.Element}
 */
const Photography: React.FC = React.memo(() => (
    <section className={styles.photography} aria-labelledby="photography-heading">
        <h2 id="photography-heading" tabIndex={0}>Photography</h2>
        <div className={styles.gallery}>
            {photos.map((photo: Photo, idx: number) => (
                <figure key={idx} className={styles.photo}>
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                    <figcaption className="visually-hidden">{photo.alt}</figcaption>
                </figure>
            ))}
        </div>
    </section>
));

export default Photography;
