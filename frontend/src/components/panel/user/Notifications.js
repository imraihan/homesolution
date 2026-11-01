'use client';
import { useDispatch, useSelector } from 'react-redux';
import { BsCalendarCheck, BsCreditCard2Front, BsMegaphone, BsInfoCircle, BsCheck2All, BsX } from 'react-icons/bs';
import { PageHeader, Card, EmptyState } from '../ui';
import { markNotification, markAllNotifications, removeNotification, showToast } from '@/store/slices/panelSlice';

const ICON = { booking: BsCalendarCheck, payment: BsCreditCard2Front, offer: BsMegaphone, system: BsInfoCircle };

export default function UserNotifications() {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.panel.user.notifications);
  const unread = list.filter((n) => !n.read).length;

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={unread ? `You have ${unread} unread notification${unread > 1 ? 's' : ''}.` : 'You are all caught up.'}
        actions={<button type="button" className="pn-btn pn-btn--ghost" disabled={!unread} onClick={() => { dispatch(markAllNotifications()); dispatch(showToast('All marked as read')); }}><BsCheck2All aria-hidden="true" /> Mark all as read</button>}
      />
      <Card flush>
        {list.length === 0 ? (
          <EmptyState title="No notifications" text="We will let you know when something happens." />
        ) : (
          <ul className="pn-notifs">
            {list.map((n) => {
              const Icon = ICON[n.type] || BsInfoCircle;
              return (
                <li key={n.id} className={n.read ? '' : 'is-unread'}>
                  <span className={`pn-notifs__icon pn-notifs__icon--${n.type}`}><Icon aria-hidden="true" /></span>
                  <button type="button" className="pn-notifs__main" onClick={() => dispatch(markNotification(n.id))} aria-label={`${n.title}. ${n.read ? 'Read' : 'Mark as read'}`}>
                    <strong>{n.title}{!n.read && <i className="pn-dot" aria-label="unread" />}</strong>
                    <span>{n.text}</span>
                    <small>{n.time}</small>
                  </button>
                  <button type="button" className="pn-iconbtn" aria-label={`Dismiss ${n.title}`} onClick={() => dispatch(removeNotification(n.id))}><BsX size={20} /></button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </>
  );
}
