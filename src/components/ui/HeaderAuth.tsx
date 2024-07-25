import Link from 'next/link'
import { Button } from './Button'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import HeaderAuthDropdown from './HeaderAuthDropdown'

interface HeaderAuthProps {
  user: User | null
}

export default async function HeaderAuth({ user }: HeaderAuthProps) {
  if (user) {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('profiles')
      .select('email, display_name, avatar_url')
      .eq('user_id', user.id)
      .single()

    if (!data || error) {
      return (
        <Button variant="primary" size="sm" asChild>
          <Link href="/login">Zaloguj</Link>
        </Button>
      )
    } else {
      return (
        <HeaderAuthDropdown
          email={data.email}
          display_name={data.display_name}
          avatar_url={data.avatar_url}
        />
      )
    }
  } else {
    return (
      <Button variant="primary" asChild>
        <Link href="/login">Zaloguj</Link>
      </Button>
    )
  }
}
