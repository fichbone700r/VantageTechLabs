-- Create the 'workers' table
create table workers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Personal Information
  nombres text not null,
  apellidos text not null,
  rut text not null,
  email text,
  telefono text,
  direccion text,
  
  -- Job Information
  cargo text,
  departamento text,
  tipo_contrato text,
  fecha_ingreso date,
  sueldo_base numeric,
  afp text,
  salud text
);

-- Enable Row Level Security (RLS)
alter table workers enable row level security;

-- Create a policy that allows authenticated users to insert data
create policy "Enable insert for authenticated users only"
on workers for insert
to authenticated
with check (true);

-- Create a policy that allows authenticated users to view data
create policy "Enable read for authenticated users only"
on workers for select
to authenticated
using (true);
