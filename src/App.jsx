import { useState } from 'react'

function Nav({ activeTab, onTabChange }) {
  const tabBtn = (tab, label) => (
    <button
      onClick={() => onTabChange(tab)}
      className={
        `relative px-6 py-2 rounded-full transition-colors font-medium ` +
        (activeTab === tab
          ? 'bg-primary text-white shadow-soft'
          : 'text-gray-700 hover:bg-gray-100')
      }
    >
      {label}
    </button>
  )

  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center font-bold">LD</div>
          <div>
            <h1 className="text-2xl font-bold leading-none">Logistic Dashboard</h1>
            <p className="text-xs text-gray-500">Monitor And Manage All Delivery Operations</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">🔔</span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition">👤</span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-3 bg-gray-50 rounded-full inline-flex p-1 text-sm ring-1 ring-gray-200 shadow-soft">
          {tabBtn('dashboard','Dashboard')}
          {tabBtn('schedule','Schedule')}
          {tabBtn('reports','Reports')}
        </div>
      </div>
    </header>
  )
}

function Field({ label, required=false, children }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-gray-800">
        {label}{required && ' *'}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  )
}

function Radio({ name, label, checked }){
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <input type="radio" name={name} defaultChecked={checked} className="h-4 w-4 text-primary focus:ring-primary" />
      {label}
    </label>
  )
}

export default function App(){
  const [service] = useState('pickup')
  const [activeTab, setActiveTab] = useState('schedule')

  function handleSubmit(event){
    event.preventDefault()
    const form = event.currentTarget
    if(!form.checkValidity()){
      form.reportValidity()
      return
    }
    alert('Pickup scheduled successfully!')
  }
  const inputClass = "w-full rounded-xl border border-gray-200 px-3.5 py-2.5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition";
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-rose-50">
      <Nav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="mx-auto max-w-5xl bg-white rounded-2xl shadow-soft ring-1 ring-gray-100 p-6 md:p-10 relative">
          <h2 className="text-xl md:text-2xl font-semibold">Schedule Pickup</h2>
          <p className="text-sm text-gray-500 mt-1">Book a pickup service for your laundry and dry cleaning needs</p>

          {activeTab === 'schedule' && (
          <form noValidate onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-3">Select Service Type</p>
              <div className="flex items-center gap-8">
                <Radio name="service" label="Pickup" checked={service==='pickup'} />
                <Radio name="service" label="Delivery" />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full Name" required>
                  <input required name="fullName" className={inputClass} placeholder="Enter Details" />
                </Field>
                <Field label="Phone Number" required>
                  <input required name="phone" pattern="^[0-9+\-()\s]{7,}$" title="Enter a valid phone number" className={inputClass} placeholder="Enter Details" />
                </Field>
                <Field label="Email Address" required>
                  <input required type="email" name="email" className={inputClass} placeholder="Enter Details" />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Address Details">
                    <textarea required name="address" rows="4" className={inputClass} placeholder="Write something..." />
                  </Field>
                </div>
                <Field label="Prefred Date" required>
                  <input required type="date" name="date" className={inputClass} />
                </Field>
                <Field label="Prefred Time" required>
                  <input required type="time" name="time" className={inputClass} />
                </Field>
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold">Special Instruction *</p>
                <textarea required name="instruction" rows="4" className={`${inputClass} mt-2`} placeholder="Write something..." />
              </div>

              <div className="mt-4">
                <Field label="Emergency Contact" required>
                  <input required name="emergency" pattern="^[0-9+\-()\s]{7,}$" title="Enter a valid contact number" className={inputClass} placeholder="Enter Details" />
                </Field>
              </div>

              <button type="submit" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-white shadow-soft hover:brightness-95 transition">Schedule Pickup</button>
            </div>

            <div>
              <p className="text-sm font-semibold">Item's to Process</p>
              <p className="text-xs text-gray-500">Select The Items To Process</p>

              <div className="mt-4 rounded-xl border border-gray-200 p-4 grid grid-cols-2 gap-3">
                {['Shirt','Suits','Jackets','Skirts','Formal Wear','Pants','Dress','Blouse','Tie','Casual Wear'].map((item, idx)=> (
                  <label key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked={['Pants','Dress','Tie'].includes(item)} className="h-4 w-4 text-primary focus:ring-primary" />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </form>
          )}

          {activeTab === 'dashboard' && (
            <div className="mt-8 text-gray-600">Overview coming soon. Use Schedule to create a pickup.</div>
          )}

          {activeTab === 'reports' && (
            <div className="mt-8 text-gray-600">Reports section placeholder.</div>
          )}
        </section>
      </main>
    </div>
  )
}


