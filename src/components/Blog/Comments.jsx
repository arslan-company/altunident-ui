import Link from 'next/link';
import { useTranslation } from 'next-i18next';

function Comments() {
  const { t } = useTranslation('common');

  return (
    <div className="comments-area">
      <h3 className="comments-title">
        2
        {' '}
        {t('blog_detail_page.comments_area.comment_count_title')}
        :
      </h3>

      <ol className="comment-list">
        <li className="comment">
          <div className="comment-body">
            <footer className="comment-meta">
              <div className="comment-author vcard">
                <img
                  src="/img/blog-details/comment-img-1.jpg"
                  className="avatar"
                  alt="avatar"
                />
                <b className="fn">John Jones</b>
                <span className="says">says:</span>
              </div>

              <div className="comment-metadata">
                <a href="#">
                  <span>April 24, 2020 at 10:59 am</span>
                </a>
              </div>
            </footer>

            <div className="comment-content">
              <p>
                Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a
                type.
              </p>
            </div>

            <div className="reply">
              <a href="#" className="comment-reply-link">
                {t('blog_detail_page.comments_area.comment_list_item.reply_button_text')}
              </a>
            </div>
          </div>

          <ol className="children">
            <li className="comment">
              <div className="comment-body">
                <footer className="comment-meta">
                  <div className="comment-author vcard">
                    <img
                      src="/img/blog-details/comment-img-2.jpg"
                      className="avatar"
                      alt="author"
                    />
                    <b className="fn">Steven Smith</b>
                    <span className="says">says:</span>
                  </div>

                  <div className="comment-metadata">
                    <a href="#">
                      <span>April 24, 2020 at 10:59 am</span>
                    </a>
                  </div>
                </footer>

                <div className="comment-content">
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error
                    sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae
                    ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo. Nemo enim
                  </p>
                </div>

                <div className="reply">
                  <Link href="#" className="comment-reply-link">
                    {t('blog_detail_page.comments_area.comment_list_item.reply_button_text')}
                  </Link>
                </div>
              </div>
            </li>
          </ol>
        </li>

        <li className="comment">
          <div className="comment-body">
            <footer className="comment-meta">
              <div className="comment-author vcard">
                <img
                  src="/img/blog-details/comment-img-3.jpg"
                  className="avatar"
                  alt="author"
                />
                <b className="fn">John Doe</b>
                <span className="says">says:</span>
              </div>

              <div className="comment-metadata">
                <a href="#">
                  <span>April 24, 2020 at 10:59 am</span>
                </a>
              </div>
            </footer>

            <div className="comment-content">
              <p>
                Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a
                type.
              </p>
            </div>

            <div className="reply">
              <Link href="#" className="comment-reply-link">
                {t('blog_detail_page.comments_area.comment_list_item.reply_button_text')}
              </Link>
            </div>
          </div>
        </li>
      </ol>

      <div className="comment-respond">
        <h3 className="comment-reply-title">{t('blog_detail_page.comments_area.comment_respond.comment_reply_title')}</h3>

        <form className="comment-form">
          <p className="comment-notes">
            <span id="email-notes">
              {t('blog_detail_page.comments_area.comment_respond.form.comment_notes_text')}
            </span>
            <span className="required">*</span>
          </p>
          <p className="comment-form-author">
            <label>
              {t('blog_detail_page.comments_area.comment_respond.form.name_input_label_text')}
              {' '}
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required="required"
            />
          </p>
          <p className="comment-form-email">
            <label>
              {t('blog_detail_page.comments_area.comment_respond.form.email_input_label_text')}
              {' '}
              <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required="required"
            />
          </p>
          <p className="comment-form-url">
            <label>{t('blog_detail_page.comments_area.comment_respond.form.website_input_label_text')}</label>
            <input type="url" id="url" name="url" />
          </p>
          <p className="comment-form-comment">
            <label>{t('blog_detail_page.comments_area.comment_respond.form.comment_input_label_text')}</label>
            <textarea
              name="comment"
              id="comment"
              cols="45"
              rows="5"
              required="required"
            />
          </p>
          <p className="form-submit">
            <input
              type="submit"
              name="submit"
              id="submit"
              className="submit"
              value={t('blog_detail_page.comments_area.comment_respond.form.submit_button_text')}
            />
          </p>
        </form>
      </div>
    </div>
  );
}

export default Comments;
